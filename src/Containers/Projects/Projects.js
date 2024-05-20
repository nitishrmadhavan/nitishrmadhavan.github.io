import React, {useState, useEffect, Suspense, lazy} from "react";
import "./Projects.scss";
import Button from "../../Components/Button/Button";
import {ProjectsConst, SocialMediaLinksConst} from "../../Utils/Constants";
import Loading from "../../Containers/Loading/Loading";

export default function Projects() {
  const GitRepoStack = lazy(() =>
    import("../../Components/GitRepoStack/GitRepoStack")
  );
  const FailedLoading = () => null;
  const renderLoader = () => <Loading />;
  const [repo, setrepo] = useState([]);
  useEffect(() => {
    const getRepoData = () => {
      fetch("/profile.json")
        .then(result => {
          if (result.ok) {
            return result.json();
          }
          throw result;
        })
        .then(response => {
          setrepoFunction(response.data.user.pinnedItems.edges);
        })
        .catch(function (error) {
          console.error(
            `${error} (because of this error, nothing is shown in place of Projects section. Also check if Projects section has been configured)`
          );
          setrepoFunction("Error");
        });
    };
    getRepoData();
  }, []);

  function setrepoFunction(array) {
    setrepo(array);
  }
  if (
    !(typeof repo === "string" || repo instanceof String) &&
    ProjectsConst.display
  ) {
    return (
      <Suspense fallback={renderLoader()}>
        <div className="main" id="projects">
          <h1 className="project-title">Projects</h1>
          <div className="repo-cards-div-main">
            {repo.map((v, i) => {
              if (!v) {
                console.error(
                  `Github Object for repository number : ${i} is undefined`
                );
              }
              return (
                <GitRepoStack repo={v} key={v.node.id} />
              );
            })}
          </div>
          <Button
            text={"More Projects"}
            className="project-button"
            href={SocialMediaLinksConst.github}
            newTab={true}
          />
        </div>
      </Suspense>
    );
  } else {
    return <FailedLoading />;
  }
}
