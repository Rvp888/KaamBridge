import { getSavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

function SavedJobs() {
  const { isLoaded: isUserLoaded } = useUser();

  const {
    fn: fnSavedJobs,
    data: savedJobs,
    loading: loadingSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isUserLoaded) fnSavedJobs();
  }, [isUserLoaded]);

  if (!isUserLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>

      {loadingSavedJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs?.length ? (
            savedJobs.map((savedJob) => {
              return (
                <JobCard
                  key={savedJob.id}
                  job={savedJob.job}
                  savedInit={true}
                  onJobSaved={fnSavedJobs}
                />
              );
            })
          ) : (
            <div>No Saved Jobs Found 👀</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
