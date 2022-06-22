package rocks.kugma.data;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;


@Entity
public class SpotifyCredentialsEntity extends PanacheEntityBase {
    @Id
    public String id;
    @Column(length = 512)
    public String accessToken;
    @Column(length = 512)
    public String refreshToken;
    public Date expiresAt;
}
