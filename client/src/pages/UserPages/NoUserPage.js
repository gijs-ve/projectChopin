import { useState } from 'react';
import { LoginPage, SignUpPage } from '.';
import { Credits } from './Credits';

function NoUserPage() {
    const [signUpActive, setSignUpActive] = useState(false);
    const signUp = { signUpActive, setSignUpActive };
    return (
        <div className="flex flex-col flex-wrap content-center text-center my-[10%] mx-[25%]">
            <Credits />
            {!signUpActive ? (
                <LoginPage signUp={signUp} />
            ) : (
                <SignUpPage signUp={signUp} />
            )}
        </div>
    );
}
export { NoUserPage };
