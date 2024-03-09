export default class ReviewModel {
    userId = "";
    userName = "";
    companySelected = null;
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
    coordinates = null;
    createdAt = "";
    updatedAt = "";


    constructor(userId, userName,companySelected, companyName, selectedDate, rating, postalCode,
                city, coordinates, comment, packageNumber, shoppingWebSite, submitComplaint,
                email, selectedImage, createdAt, updatedAt) {
        this.userId = userId;
        this.userName = userName;
        this.companySelected = companySelected;
        this.companyName = companyName;
        this.selectedDate = selectedDate;
        this.rating = rating;
        this.postalCode = postalCode;
        this.city = city;
        this.coordinates = coordinates;
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
