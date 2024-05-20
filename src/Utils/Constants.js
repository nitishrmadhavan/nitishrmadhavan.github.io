import splashAnimation from "../Assets/Lottie/SplashAnimation.json"; // Rename to your file name for custom animation

 
const SplashScreenConst = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

const IllustrationConst = {
  animated: true // Set to false to use static SVG
};

const GreetingConst = {
  username: "Nitish Madhavan",
  title: "Hello,I'm Nitish",
  subTitle: 
    "Visionary Software Architect:  Solid foundation in design principles and software development fuels my passion for crafting resilient, future-proof software.  Eager to disrupt with innovative solutions in a dynamic environment, translating theory and knowledge into tangible results.",
  resumeLink:
    "https://drive.google.com/file/d/19DHG9uoH2VO8PZNEXrkq9k7iZV3V-jV4/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

const SkillsSectionConst = {
  display: true,
  data: [
    {
      title: "Software Development",
      skills: [
      ],
      softwareSkills: [
        {
          skillName: "Java",
          fontAwesomeClassname: "simple-icons:java",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongoDB",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "simple-icons:mysql",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "Sass",
          fontAwesomeClassname: "simple-icons:sass",
          style: {
            color: "#CC6699",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
      ],
    },
    {
      title: "Graphic Design",
      skills: [
      ],
      softwareSkills: [
        {
          skillName: "Adobe Illustrator",
          fontAwesomeClassname: "simple-icons:adobexd",
          style: {
            color: "#FF2BC2",
          },
        },
        {
          skillName: "Adobe Photoshop",
          fontAwesomeClassname: "simple-icons:figma",
          style: {
            color: "#F24E1E",
          },
        },
        {
          skillName: "Adobe Premiere Pro",
          fontAwesomeClassname: "simple-icons:adobeillustrator",
          style: {
            color: "#FF7C00",
          },
        },
        {
          skillName: "Adobe After Effects",
          fontAwesomeClassname: "simple-icons:inkscape",
          style: {
            color: "#000000",
          },
        },
      ],
    },
  ],
};

const ExperiencesConst = {
  display: true,
  experience: [
    {
      role: "Intern - Techno Functional Intern",
      company: "Lentra.AI",
      companylogo: require("./../Assets/Images/LentraLogo.png"),
      date: "July/2023 - May/2024",
      desc: "Tech – MongoDB, Debezium, Kafka, Airflow, Postgres, Spark, Livy, HDFS, S3, AWS Glue",
      descBullets: [
        "Received recognition in the form of the \"High Five Award\" for exceptional technical skills during the OND quarter",
        "Designed and implemented scalable and efficient ETL data pipelines using the latest technologies, streamlining the process of handling data for 50,000 individuals in batches",
        "Streamlined pipelines through effective automation, enhancing efficiency and minimizing operational overhead",
        "Collaborated with cross-functional teams to identify and resolve complex technical challenges, contributing to the delivery of a high-quality product",
        "Leveraged a full-stack skill set to drive innovation, efficiency, and excellence across all project facets"
      ]
    }
  ]
};

const EducationInfoConst = {
  display: true,
  degrees: [
    // {
    //   title: "The University of Queensland, Brisbane",
    //   subtitle: "Master of Computer Science",
    //   logo_path: "UQ_Logo.png",
    //   alt_name: "UQ",
    //   duration: "July 2024 - Present",
    //   descriptions: [
    //   ],
    // },
    {
      title: "Vellore Institute of Technology, Vellore",
      subtitle: "Integrated Master of Techology in Computer Science and Engineering (5 Years)",
      logo_path: "VITLogo.png",
      alt_name: "VIT'V",
      duration: "July 2019 - May 2024",
      descriptions: [
        "Grade -  8.03 / 10 CGPA",
        "Relevant Coursework: Operating System Principles, Data Communication and Networks, Software Verification and Validation,Application Development and Deployment Architecture,Software Application Architecture."
      ],
    }
  ],
};

const ProjectsConst = {
  showGithubProfile: "true",
  display: true 
};

const SocialMediaLinksConst = {
  github: "https://github.com/nitishrmadhavan",
  linkedin: "https://www.linkedin.com/nitishrmadhavan/",
  gmail: "nitishrmadhavan@gmail.com",
  display: true // Set true to display this section, defaults to false
};
export{
    SplashScreenConst,
    IllustrationConst,
    GreetingConst,
    SkillsSectionConst,
    ExperiencesConst,
    EducationInfoConst,
    ProjectsConst,
    SocialMediaLinksConst
}