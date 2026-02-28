import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    // URL de conexión para SQL Server usando Autenticación de Windows
    // trustServerCertificate=true es clave para que no les dé error de seguridad en desarrollo local
    private static final String URL = "jdbc:sqlserver://localhost;databaseName=TiendaAgil;integratedSecurity=true;encrypt=true;trustServerCertificate=true;";

    public static Connection conectar() {
        try {
            // Se establece el "puente" con la base de datos
            Connection conexion = DriverManager.getConnection(URL);
            System.out.println("¡Conexión exitosa a la base de datos TiendaAgil!");
            return conexion;
        } catch (SQLException e) {
            System.out.println("Error grave de conexión: " + e.getMessage());
            return null;
        }
    }
}