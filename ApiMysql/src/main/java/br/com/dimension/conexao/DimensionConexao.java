package br.com.dimension.conexao;
import java.sql.*;

public class DimensionConexao {
        private static final String url = "jdbc:sqlserver://dimension.database.windows.net:1433;database=Dimension;user=dimension@dimension;password={your_password_here};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
        private static final String username = "dimension";
        private static final String password = "#Gfgrupo10";
        public static Connection createConnectionToSQL() throws Exception {
            Connection connection = DriverManager.getConnection(url, username, password);
            System.out.println("Conectado ao Banco de dados Azure");

            return connection;
    }
        
        public static Connection createConnectiontoMySQL() throws Exception {
            String mysqlUrl = "jdbc:mysql://0.0.0.0:3306/dimensionBD?autoReconnect=true&useSSL=false";
            Connection mysqlCon = DriverManager.getConnection(mysqlUrl, "root", "urubu100");
            System.out.println("Conectado ao MysqlBD");
            
            return mysqlCon;
        }

    public static void main(String[] args) throws Exception {
        Connection con= createConnectionToSQL();
        Connection mysql = createConnectiontoMySQL();

        if (con!=null){
            System.out.println("Conectado com sucesso ao Azure");
            con.close();
        }
        
        if (mysql!=null){
            System.out.println("Conectado com sucesso ao MySQL");
            mysql.close();
        }
        
        
    }
}
