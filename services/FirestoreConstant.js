import moment from "moment";

export default {
    USER_TABLE :  'Users',
    COMPANY_TABLE :  'Company',
    REVIEW_TABLE :  'Review',
}

export const getISOStringFromDate = (date) => {
    return moment(date).toISOString();
};

