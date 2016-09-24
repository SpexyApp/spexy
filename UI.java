package com.combined;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.FlowLayout;
import java.awt.event.ComponentAdapter;

/**
 * Created by Utkarsh on 9/24/2016.
 */
public class UI extends JFrame {
    private JButton signin;
    private JPanel panel;
    private JTextField userCompName;
    private JPasswordField userPass;
    private JButton cancelButton;
    private JTextField userID;

    public UI()
    {
        signin.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String userid = userID.getText();
                String userPassword = userPass.getText();
                String userpcname = userCompName.getText();
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

    public static void main(String args[]) {
        JFrame UI = new JFrame("App");
        UI.setContentPane(new UI().panel);
        UI.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        UI.setSize(800, 500);
        UI.setVisible(true);

    }

}
