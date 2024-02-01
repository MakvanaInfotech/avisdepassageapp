
export default class UserModel {
    userId = "";
    name = "";
    phone = "";
    deviceId = "";
    deviceType = "";
    fcmToken = "";
    appVersion = "";
    language = "";
    country= "";
    timezone= "";
    isVerified= false;
    isActive = false;
    isDeleted = false;
    createdAt = "";
    updatedAt = "";

    constructor(userId, name, email, phone, deviceId, deviceType, fcmToken, appVersion, language,
                country, isVerified, isActive, isDeleted, createdAt, updatedAt) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.deviceId = deviceId;
        this.deviceType = deviceType;
        this.fcmToken = fcmToken;
        this.appVersion = appVersion;
        this.language = language;
        this.country = country;
        this.isVerified = isVerified;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
