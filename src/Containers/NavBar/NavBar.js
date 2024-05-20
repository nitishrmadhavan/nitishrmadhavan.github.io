import Headroom from "react-headroom";
import "./NavBar.scss";
import {
    GreetingConst,
    SkillsSectionConst,
    ExperiencesConst,
    EducationInfoConst,
    ProjectsConst,
    SocialMediaLinksConst
} from "../../Utils/Constants";

function Header() {
    const viewSkills = SkillsSectionConst.display;
    const viewExperience = ExperiencesConst.display;
    const viewEducationInfo = EducationInfoConst.display;
    const viewProjects = ProjectsConst.display;
    const viewSocialMedia = SocialMediaLinksConst.display;
    
    return (
        <Headroom>
            <header className="header">
                <a href="/" className="logo">
                    <span className="grey-color"> &lt;</span>
                    <span className="logo-name">{GreetingConst.username}</span>
                    <span className="grey-color">/&gt;</span>
                </a>
                <input className="menu-btn" type="checkbox" id="menu-btn" />
                <label
                    className="menu-icon"
                    htmlFor="menu-btn"
                    style={{ color: "white" }}
                >
                    <span className="navicon"></span>
                </label>
                <ul className="menu">
                    {viewSkills && (
                        <li>
                            <a href="#skills">Skills</a>
                        </li>
                    )}
                    {viewExperience && (
                        <li>
                            <a href="#Experience">Experiences</a>
                        </li>
                    )}
                    {viewEducationInfo && (
                        <li>
                            <a href="#Education">Education</a>
                        </li>
                    )}
                    {viewProjects && (
                        <li>
                            <a href="#projects">Projects</a>
                        </li>
                    )}
                    {viewSocialMedia && (
                        <li>
                            <a href="#Contact">Contact Me</a>
                        </li>
                    )}
                </ul>
            </header>
        </Headroom>
    );
}

export default Header;
