/**
 * Model Users
 */
module.exports = {
  name: 'Users',

  schema: {

    email: {
      index: true,
      type: String,
      unique: true,
      set: function(email) {
        return email.toLowerCase();
      }
    },

    password: {
      type: String
    },

    lastname: {
      type: String
    },

    firstname: {
      type: String
    },

    address: {
      type: String
    },

    zipcode: {
      type: String
    },

    city: {
      type: String
    },

    photo: {
      type: String
    },

    createdAt: {
      type: Date,
      default: Date.now()
    },

    updatedAt: {
      type: Date
    }
  },

  statics: {

    /**
     * Users.emailExists(string: email)
     * 
     * @description
     * Vérifie qu'un email existe en base de donées
     * Si l'email existe, la promesse est resolved
     * Si l'email n'existe pas, la promesse est rejetée
     *
     * @return
     * Promise
     */
    emailExists: function(email) {
      var promise = new Mongoose.Promise;
      this.findOne({email: email}).exec(function(err, user) {
        if (err) {
          promise.reject(err);
        }

        else if (! user) {
          promise.reject();
        }

        else {
          promise.fulfill(user);
        }
      });
      return promise;
    }

  }
};
