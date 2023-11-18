import './resume.scss';

function Resume() {
    return (
        <div className='resume-container'>
            <div className='column1'>
                <h1>Jay Oh</h1>
                <h2 className='position'>Software Engineer</h2>
                <h4>Greater Seattle Area, WA</h4>
                <h4>U.S. Army Veteran</h4>
            </div>
            <div className='column2'>
                <p>(208) 206 - 1457</p>
                <p>jungwon.oh0920@gmail.com</p>
                <a href='https://portfolio-jungwonoh0920.vercel.app/' target='_blank' rel="noopener noreferrer">portfolio-jungwonoh0920.vercel.app/</a>
                <br />
                <a href='https://www.linkedin.com/in/jayoh1/' target='_blank' rel="noopenner noreferrer">www.linkedin.com/in/jayoh1</a>
                <br />
                <a href='https://github.com/jungwonOh0920' target='_blank' rel="noopenner noreferrer">www.github.com/jungwonOh0920</a>
            </div>
            <div className='column1'>
                <h2>Work experiences</h2>
            </div>
            <div className='column2'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <h3>Front-end/UI Developer</h3>
                        <h4>Rainfocus</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>03/2022 - 01/2023</p>
                        <p>Lehi, UT (Remote)</p>
                    </div>
                    <ul className='description-list'>
                        <li>Contributed to the development and maintenance of RainFocus core product set, ensuring exceptional usability and design..</li>
                        <li>Collaborated with Project Managers and UI/UX designers to deliver outstanding RF platforms to customer</li>
                        <li>Ensured consistency in React components' styling by working closely with the design and engineering teams.</li>
                        <li>Developed with cross-browser compatibility and accessibility.</li>
                        <li>Source code management and project tracking with the agile team in Git and JIRA.</li>
                    </ul>
                    <br />
                    <div className='flex flex-row justify-between'>
                        <h3>Front-end Engineer</h3>
                        <h4>Kanopy</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>06/2020 - 03/2022</p>
                        <p>Irvine, CA</p>
                    </div>
                    <ul className='description-list'>
                        <li>Developed KUI, a new interface that significantly improved the delivery of over 30,000 films, documentaries, and educational videos.</li>
                        <li>Conducted rigorous code reviews and successfully maintained browser compliance while troubleshooting and resolving numerous bugs.</li>
                        <li>Utilized Jest testing to ensure high-quality components/pages were consistently delivered to company standards.</li>
                        <li>Successfully managed states using a single source of truth approach, which resulted in streamlined processes and increased efficiency.</li>
                    </ul>
                    <br />
                    <div className='flex flex-row justify-between'>
                        <h3>Software Engineer Intern</h3>
                        <h4>Overstock.com</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>04/2019 - 08/2019</p>
                        <p>Midvale, UT</p>
                    </div>
                    <ul className='description-list'>
                        <li>Implemented robust unit tests and streamlined Android development by incorporating dependency injection techniques.</li>
                        <li>Proficiently managed version control through Git and Sourcetree to ensure smooth collaboration among the team.</li>
                    </ul>
                </div>
            </div>
            <div className='column1'>
                <h2>Project</h2>
            </div>
            <div className='column2'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <h3>Video Streaming Site Clone Project</h3>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>09/2022 - Present</p>
                        <a href='https://github.com/jungwonOh0920/tmdb' target='_blank' rel="noopenner noreferrer">Source code: github.com/jungwonOh0920/tmdb</a>
                    </div>
                    <ul className='description-list'>
                        <li>Utilizing and fetching The Movie Database API for contents.</li>
                        <li>Developing using React.js, Sass, TailwindCSS for front-end side and Firebase/Firestore for Authentication and database.</li>
                    </ul>
                </div>
            </div>
            <div className='column1'>
                <h2>Education</h2>
            </div>
            <div className='column2'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <h3>B.S. in Software Engineering</h3>
                        <h4>Brigham Young University - Idaho</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>2014 - 2019</p>
                        <p>Resburg, ID</p>
                    </div>
                    <ul className='description-list'>
                        <li>GPA: 3.7</li>
                        <li>Taught and guided students as a tutor in Math and OOP in Java and C++.</li>
                        <li>Completed classes for the Data Structures, Algorithms and SQL.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
} 

export default Resume