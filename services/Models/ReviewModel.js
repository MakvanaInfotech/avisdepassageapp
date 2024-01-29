export default class ReviewModel {
    userId = "";
    userName = "";
    companyName = "";
    selectedDate = "";
    rating = "";
    postalCode = "";
    city = "";
    comment = "";
    packageNumber = "";
    shoppingWebSite = "";
    submitComplaint = false;
    email = "";
    selectedImage = "";
    createdAt = "";
    updatedAt = "";

    constructor(userId, userName, companyName, selectedDate, rating, postalCode,
                city, comment, packageNumber, shoppingWebSite, submitComplaint,
                email, selectedImage, createdAt, updatedAt) {
        this.userId = userId;
        this.userName = userName;
        this.companyName = companyName;
        this.selectedDate = selectedDate;
        this.rating = rating;
        this.postalCode = postalCode;
        this.city = city;
        this.comment = comment;
        this.packageNumber = packageNumber;
        this.shoppingWebSite = shoppingWebSite;
        this.submitComplaint = submitComplaint;
        this.email = email;
        this.selectedImage = selectedImage;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
