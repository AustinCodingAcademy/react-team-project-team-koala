package springapp.appointment;

public class Appointment {
  private Integer id;
  private Integer petId;
  private String date;
  private String type; // walk-in, web, phone
  private String reason; // checkup, shots, sick

  public Appointment() {

  }

  public Appointment(Integer id, Integer petId, String date, String type, String reason) {
    super();
    this.id = id;
    this.petId = petId;
    this.date = date;
    this.type = type;
    this.reason = reason;
  }

  public Integer getId() {
    return id;
  }

  public Integer getPetId() {
    return petId;
  }

  public String getDate() {
    return date;
  }

  public String getType() {
    return type;
  }

  public String getReason() {
    return reason;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public void setPetId(Integer petId) {
    this.petId = petId;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public void setType(String type) {
    this.type = type;
  }

  public void setReason(String reason) {
    this.reason = reason;
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
    Appointment other = (Appointment) obj;
    if (id != other.id)
      return false;
    return true;
  }

}