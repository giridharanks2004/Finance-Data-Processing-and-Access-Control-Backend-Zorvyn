import { ExpenseCategories, FinanceType, SupportedCurrencies, UserRoles } from "./enums.mjs";

// post validation for user creation
export const UserCreationValidationSchema = {
    email : {
        notEmpty : {
            errorMessage : "user email cannot be empty"
        },
        matches: {
            options: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMessage: "Please use a valid email address"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "password cannot be empty"
        },
        isLength : {
            options : {min : 8 , max : 15},
            errorMessage : "length  should be min 8 to max 15 characters"
        }
    },
    role : {
        notEmpty : {
            errorMessage : "role cannot be empty"
        },
        isIn : {
            options : [UserRoles],
            errorMessage :  `role must be of ${UserRoles}`
        }
   }
}


// patch validation for user fields
export const UserUpdationValidationSchema = {
    newEmail : {
        optional : true,
        notEmpty : {
            errorMessage : "user email cannot be empty"
        },
        matches: {
            options: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
            errorMessage: "Please use a valid email address"
        }
    },
   newRole : {
        optional : true,
        notEmpty : {
            errorMessage : "role cannot be empty"
        },
        isIn : {
            options : [UserRoles],
            errorMessage :  `role must be of ${UserRoles}`
        }
   },
   oldPassword : {
        optional : true,
        notEmpty : {
            errorMessage : "password cannot be empty"
        },
        isLength : {
            options : {min : 8 , max : 15},
            errorMessage : "length  should be min 8 to max 15 characters"
        }
   },
   newPassword : {
        optional : true,
        notEmpty : {
            errorMessage : "password cannot be empty"
        },
        isLength : {
            options : {min : 8 , max : 15},
            errorMessage : "length  should be min 8 to max 15 characters"
        }
   }
}

// login validaiton
export const UserAuthValidation = {
    email : {
        notEmpty : {
            errorMessage : "user email cannot be empty"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "password cannot be empty"
        },
        isLength : {
            options : {min : 8 , max : 15},
            errorMessage : "length  should be min 8 to max 15 characters"
        }
    }
}

// post validation for finance record
export const FinanceDataValidation = {
    amount : {
        notEmpty :{
            errorMessage : "amount cannot be empty "
        },
        isInt: {
            options: { min: 1},
            errorMessage: "amount must be a whole number between 1 and 500"
        },
        toInt: true 
    },
    currency : {
        optional : true,
        notEmpty : {
            errorMessage : "currency cannot be empty"
        },
        isString: {
            errorMessage: "Category must be a string"
        },
        trim : true,
        isIn : {
            options : [SupportedCurrencies],
            errorMessage :  `role must be of ${SupportedCurrencies}`
        }
   },
    RecordType : {
        notEmpty : {
            errorMessage : "RecordType cannot be empty"
        },
        isString: {
            errorMessage: "RecordType must be a string"
        },
        trim : true,
        isIn : {
            options : [FinanceType],
            errorMessage :  `role must be of ${FinanceType}`
        }
   },
   Category : {
        notEmpty : {
            errorMessage : "Category cannot be empty"
        },
        isString: {
            errorMessage: "Category must be a string"
        },
        trim : true,
        isIn : {
            options : [ExpenseCategories],
            errorMessage :  `role must be of ${ExpenseCategories}`
        }
   },
   description : {
        optional : true,
        isString: {
            errorMessage: "description must be a string"
        },
        trim : true,
        isLength : {
            options : {max : 350},
            errorMessage : "description cannot be more than 350 characters"
        }
   }
}



// patch validation for finance records
export const FinanceUpdationDataValidation = {
    newAmount : {
        optional : true,
        notEmpty :{
            errorMessage : "amount cannot be empty "
        },
        isInt: {
            options: { min: 1 },
            errorMessage: "amount must be a whole number between 1 and 500"
        },
        toInt: true 
    },
    newRecordType : {
        optional : true,
        notEmpty : {
            errorMessage : "RecordType cannot be empty"
        },
        isString: {
            errorMessage: "RecordType must be a string"
        },
        trim : true,
        isIn : {
            options : [FinanceType],
            errorMessage :  `role must be of ${FinanceType}`
        }
   },
   newCategory : {
        optional : true,
        notEmpty : {
            errorMessage : "role cannot be empty"
        },
        isString: {
            errorMessage: "Category must be a string"
        },
        trim : true,
        isIn : {
            options : [ExpenseCategories],
            errorMessage :  `role must be of ${ExpenseCategories}`
        }
   },
   newDesc : {
        optional : true,
        isString: {
            errorMessage: "description must be a string"
        },
        trim : true,
        isLength : {
            options : {max : 350},
            errorMessage : "description cannot be more than 350 characters"
        }
   }
}