package com.teksystems.capstonebackendsboot.logging;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Logger {
    public static void writeLog(String info) {


        BufferedWriter bw = null;
        FileWriter fw = null;
        try {
//
            fw = new FileWriter("C:\\Users\\nmcke\\Desktop\\Code\\capstone-backend-sboot\\src\\main\\java\\com\\teksystems\\capstonebackendsboot\\logging\\myFile.txt", true);
            bw = new BufferedWriter(fw);
            bw.append(info);
            bw.append("\n");
            bw.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bw != null)
                    bw.close();
                if (fw != null)
                    fw.close();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }
}
