package com.combined;

import org.apache.commons.io.FileUtils;
import javax.swing.*;
import javax.swing.filechooser.FileSystemView;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.FlowLayout;
import java.awt.event.ComponentAdapter;
import java.io.*;
import java.net.*;
import java.net.ProtocolException;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.StringJoiner;
import com.sun.deploy.net.HttpResponse;
import org.apache.commons.httpclient.URI;
import org.json.*;
import org.apache.commons.httpclient.*;
import org.omg.CORBA.Request;
import sun.misc.IOUtils;

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
                    //String str = sj.toString();
                    int length = out.length;

                    //getting success/fail lead from server
                    /*http.setFixedLengthStreamingMode(length);
                    http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                    http.connect();
                    try(OutputStream os = http.getOutputStream()) {
                        os.write(out);
                        out.();
                        System.out.println(out);
                    }
                    BufferedReader rd = new BufferedReader(new InputStreamReader(http.getInputStream()));
                    Scanner s = new Scanner(http.getInputStream()).useDelimiter("\\A");
                    String result = s.hasNext() ? s.next() : ""; **/

                    URL get = new URL("http://nisarg.me:1337/pcauth/" + userid + "/" + userPassword + "/" + usermac + "/" + userpcname);
                    BufferedReader in = new BufferedReader(new InputStreamReader(get.openStream()));
                    String inputLine;
                    while((inputLine = in.readLine()) != null)
                    {
                        if(inputLine.equals("false"))
                        {
                            JOptionPane.showMessageDialog(null, "There seems to be something wrong with the data you entered. Try again");
                        }
                        else
                        {
                            URL urlurl = new URL("https://github.com/SpexyApp/spexy/tree/master/spexy");
                            String path = urlurl.toString();
                            File file = new File(path);
                            FileUtils.copyURLToFile(url, file);
                        }
                    }
                    in.close();

                    if(true)
                    {

                    }
                }
                catch (UnknownHostException e1)
                {
                    e1.printStackTrace();
                }
                catch(SocketException e1)
                {
                    e1.printStackTrace();
                } catch (UnsupportedEncodingException e1) {
                    e1.printStackTrace();
                } catch (ProtocolException e1) {
                    e1.printStackTrace();
                } catch (MalformedURLException e1) {
                    e1.printStackTrace();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
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
    }

}
