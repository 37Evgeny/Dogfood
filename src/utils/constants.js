export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const GROUP_REGEXP = /^(group-)[0-9]{1,3}/;

export const VALIDATE_CONFIG={
    requiredMessage: 'Обязательное поле',
    emailMessage: 'Email не соответствует формату электронной почты',
    groupMessage: " Группа должна соответствовать формату group-номер-группы",
    passwordMessage: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру"
}

export const INITIAL_VALUE_RATING = 1;

export const SORTED= {
    LOW: 'low',
    CHEAP: 'cheap',
    SALE: 'sale'
}