import { UserRoles } from "./enums.mjs";

export const UserCreationValidationSchema = {
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