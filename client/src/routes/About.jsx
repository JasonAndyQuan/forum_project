const AboutPage = () => {
    return (
        <div className="bg-[#281E34] h-screen flex justify-center p-5">
            <div className="text-white text-center space-y-4">
                <div className="space-y-2">
                    <h2 className="text-4xl font-semibold mb-10">Techs Used</h2>
                    <ul className="list-disc list-inside">
                        <li><span className="font-semibold">Frontend:</span> Vite React + TailwindCSS</li>
                        <li><span className="font-semibold">Backend:</span> Postgres + Node + Express</li>
                        <li><span className="font-semibold">User Authentication:</span> Passport-local + bcrypt + express-validator + express-session</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
