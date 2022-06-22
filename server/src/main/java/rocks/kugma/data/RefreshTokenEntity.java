package rocks.kugma.data;


import io.quarkus.hibernate.orm.panache.PanacheEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class RefreshTokenEntity extends PanacheEntity {
    private int hashCode;
    private String userId;
    private boolean used;

    public static RefreshTokenEntity findByHashCode(int hashCode){
        return find("hashCode", hashCode).firstResult();
    }

    public static long deleteByUser(String userId) {
        return delete("userId", userId);
    }
}
