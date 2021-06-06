package br.com.dimension.dao;

import br.com.dimension.conexao.DimensionConexao;
import br.com.dimension.insercao.Insercao;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class DimensionDAO {

    public void inserirBD (Insercao insercao){
        String sql = "INSERT INTO registro(nomeComponente, data, dadosColetados) VALUES (?, ?, ?) ";
        Connection conn = null;
        Connection mysql = null;
        PreparedStatement pstm = null;
        PreparedStatement psmysql = null;
        try{
            conn = DimensionConexao.createConnectionToSQL();
            pstm = (PreparedStatement) conn.prepareStatement(sql);
            pstm.setString(1, insercao.getNomeComponente());
            pstm.setDate(2, new Date(insercao.getData().getTime()));
            pstm.setDouble(3, insercao.getDadosColetados());
            pstm.execute();
            
            mysql = DimensionConexao.createConnectionToSQL();
            psmysql = (PreparedStatement) mysql.prepareStatement(sql);
            psmysql.setString(1, insercao.getNomeComponente());
            psmysql.setDate(2, new Date(insercao.getData().getTime()));
            psmysql.setDouble(3, insercao.getDadosColetados());
            psmysql.execute();

        } catch (Exception e) {
            e.printStackTrace();
        }
        finally {
            try{
                if (pstm!=null){
                    pstm.close();
                }
                if (psmysql!=null){
                    psmysql.close();
                }
                if (conn!=null){
                    conn.close();
                }
                if (mysql!=null){
                    mysql.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
