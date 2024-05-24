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
          fontAwesomeClassname: "simple-icons:Java",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "simple-icons:mysql",
          style: {
            color: "#4479A1",
          },
        },
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "simple-icons:css3",
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
        {
          skillName: "Git",
          fontAwesomeClassname: "simple-icons:git",
          style: {
            color: "#F05032",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#2496ED",
          },
        },
        {
          skillName: "Jenkins",
          fontAwesomeClassname: "simple-icons:jenkins",
          style: {
            color: "#D24939",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#232F3E",
          },
        },
        {
          skillName: "Spring",
          fontAwesomeClassname: "simple-icons:spring",
          style: {
            color: "#6DB33F",
          },
        },
        {
          skillName: "SOAP",
          fontAwesomeClassname: "simple-icons:soap",
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
          fontAwesomeClassname: "simple-icons:adobeillustrator",
          style: {
            color: "#FF9A00",
          },
        },
        {
          skillName: "Adobe Photoshop",
          fontAwesomeClassname: "simple-icons:adobephotoshop",
          style: {
            color: "#31A8FF",
          },
        },
        {
          skillName: "Adobe Premiere Pro",
          fontAwesomeClassname: "simple-icons:adobepremierepro",
          style: {
            color: "#9999FF",
          },
        },
        {
          skillName: "Adobe After Effects",
          fontAwesomeClassname: "simple-icons:adobeaftereffects",
          style: {
            color: "#9999FF",
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
  display: true,
  socials: [
    {
      platform: "Instagram",
      accName: "Nitish M",
      userName: "@nitiszhhhh",
      idbio: [
        "KRR | BNE", 
        "Ellame inime"
      ],
      postsCount: "15",
      followersCount: "301",
      followingCount: "240",
      coverImage: "https://via.placeholder.com/1200x300", // Cover image URL
      profileImage: "https://via.placeholder.com/150" 
    },
    {
      platform: "X",
      accName: "Nitish M",
      userName: "@nitiszhhhh",
      idbio: [
        "KRR | BNE", 
        "Ellame inime"
      ],
      postsCount: "15",
      followersCount: "301",
      followingCount: "240",
      coverImage: "https://via.placeholder.com/1200x300", // Cover image URL
      profileImage: "https://via.placeholder.com/150" 
    },
  ],
};

export {
  GreetingConst,
  SkillsSectionConst,
  ExperiencesConst,
  EducationInfoConst,
  ProjectsConst,
  SocialMediaLinksConst
}