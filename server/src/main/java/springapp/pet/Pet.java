package springapp.pet;

public class Pet {
  private Integer id;
  private String name;
  private String gender;
  private Integer clientId;

  public Pet() {

  }

  public Pet(Integer id, String name, String gender, Integer clientId) {
    super();
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.clientId = clientId;
  }

  public Integer getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getGender() {
    return gender;
  }

  public Integer getClientId() {
    return clientId;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public void setClientId(Integer clientId) {
    this.clientId = clientId;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + (int) (id ^ (id >>> 32));
    return result;
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Pet other = (Pet) obj;
    if (id != other.id)
      return false;
    return true;
  }

}