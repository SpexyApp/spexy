package com.combined;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.FlowLayout;
import java.awt.event.ComponentAdapter;
import java.io.IOException;
import java.io.OutputStream;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;
//import org.json.*;

import org.apache.commons.httpclient.*;

/**
 * Created by Utkarsh on 9/24/2016.
 */
public class UI extends JFrame
{
    private JButton signin;
    private JPanel panel;
    private JTextField userCompName;
    private JPasswordField userPass;
    private JButton cancelButton;
    private JTextField userID;
    private static String userid;
    static String userPassword;
    static String userpcname;
    static String usermac;

    //face
    //inputs email, password and PCname from user
    //String userid - email
    //String userPassword - password
    //String userpcname - pcname
    public UI()
    {
        signin.addActionListener(new ActionListener()
        {

            @Override
            public void actionPerformed(ActionEvent e)
            {
                userid = userID.getText();
                userPassword = userPass.getText();
                userpcname = userCompName.getText();
            }
        });
        panel.addComponentListener(new ComponentAdapter() {
        });
        cancelButton.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(ActionEvent e)
            {
                System.exit(0);
            }
        });
    }

    public static void main(String args[]) throws IOException
    {
        //initializing jframe
        JFrame UI = new JFrame("App");
        UI.setContentPane(new UI().panel);
        UI.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        UI.setSize(800, 500);
        UI.setVisible(true);

        //Get the mac address from the machine
        //Stores in String sb
        //printStackTrace in case not found
        InetAddress ip;
        try
        {
            ip = InetAddress.getLocalHost();
            NetworkInterface network = NetworkInterface.getByInetAddress(ip);
            byte[] mac = network.getHardwareAddress();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < mac.length; i++) {
                sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
            }
            usermac = sb.toString();
        }
        catch (UnknownHostException e)
        {
            e.printStackTrace();
        }
        catch(SocketException e)
        {
            e.printStackTrace();
        }

        //Establishing the connection
        URL url = new URL("http://nisarg.me:1337/pcauth");
        URLConnection con = url.openConnection();
        HttpURLConnection http = (HttpURLConnection)con;
        http.setRequestMethod("POST"); // PUT is another valid option
        http.setDoOutput(true);
        //JOptionPane.showMessageDialog(null, "Success");

        Map<String,String> arguments = new HashMap<>();
        arguments.put("username", userid);
        arguments.put("password", userPassword);
        arguments.put("mac", usermac);
        arguments.put("title", userpcname);
        StringJoiner sj = new StringJoiner("&");
        for(Map.Entry<String,String> entry : arguments.entrySet())
            sj.add(URLEncoder.encode(entry.getKey(), "UTF-8") + "="
                    + URLEncoder.encode(entry.getValue(), "UTF-8"));
        byte[] out = sj.toString().getBytes(StandardCharsets.UTF_8);
        int length = out.length;


        //getting from server
        http.setFixedLengthStreamingMode(length);
        http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        http.connect();
        try(OutputStream os = http.getOutputStream()) {
            os.write(out);
        }
    }

}
