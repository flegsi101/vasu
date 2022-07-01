package rocks.kugma.listenmarks;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class ListenmarkEntity extends PanacheEntityBase implements Serializable {
    @Id
    public String id;
    @Id
    public String user;
    public String name;
    public String imageUri;
    public String artists;

    public static List<ListenmarkEntity> findByUser(String user){
        return find("user", user).list();
    }

    public static long deleteByIdAndUser(String id, String user){
        return delete("id = ?1 and user = ?2", id, user);
    }
}
