import User from './../models/user.model';
import { Strategy as LocalStrategy } from 'passport-local';
passport.use(new LocalStrategy({
    usernameField: 'identifier',
    passwordField: 'password'
}, async (identifier, password, done) => {
    try {
        const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
        if (!user) {
            return done(null, false, { message: 'Incorrect email or username.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));
