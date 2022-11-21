import { useState } from 'react';
import { LoginPage, SignUpPage } from '.';

function NoUserPage() {
    const [signUpActive, setSignUpActive] = useState(false);
    const signUp = { signUpActive, setSignUpActive };
    return (
        <>
            {!signUpActive ? (
                <LoginPage signUp={signUp} />
            ) : (
                <SignUpPage signUp={signUp} />
            )}
        </>
    );
}
export { NoUserPage };
