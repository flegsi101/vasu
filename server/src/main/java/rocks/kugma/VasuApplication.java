package rocks.kugma;

import javax.ws.rs.core.Application;
import java.util.TimeZone;

@SuppressWarnings("unused")
public class VasuApplication extends Application {
    public VasuApplication() {
        super();
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }
}
