/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.combined;

import JavaUI.HTTPDownloadutility;

import java.io.IOException;

/**
 *
 * @author aljain
 */
public class JavaApplication1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        String fileURL = "https://github.com/SpexyApp/spexy/tree/master/spexy";
        String saveDir = "C://Program Files";
        try {
            HTTPDownloadutility.downloadFile(fileURL, saveDir);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }
    
}
