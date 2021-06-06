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
        //private static final String urlmsql = "jdbc:mysql://0.0.0.0:3306/dimensionBD?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC";
        private static final String urlmsql = "jdbc:mysql://0.0.0.0:3306/dimensionBD";
        private static final String usernamemsql= "root";
        private static final String passwordmsql = "urubu100";
        
        public static Connection createConnectionToMySQL() throws Exception {
            Class.forName("com.mysql.cj.jdbc.Driver"); 
            Connection connection = DriverManager.getConnection(urlmsql, usernamemsql, passwordmsql);
            System.out.println("Conectado ao Banco de dados");

            return connection;
    }

    public static void main(String[] args) throws Exception {
        Connection con= createConnectionToSQL();
        Connection mysql = createConnectionToMySQL();

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
