
import { Layout } from "@/components/Layout";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { useAccount } from 'wagmi';
import { useState } from "react";

const Index = () => {
  const { isConnected } = useAccount();
  const [jobs] = useState([
    {
      id: 1,
      title: "Technical Blog Post about Web3",
      description: "Looking for an experienced writer to create a comprehensive blog post about Web3 technology and its implications for the future of the internet.",
      budget: "0.1 ETH",
      status: "open" as const,
    },
    {
      id: 2,
      title: "White Paper for DeFi Protocol",
      description: "Need a professional writer to create a detailed white paper for our new DeFi protocol. Must have experience in cryptocurrency and financial writing.",
      budget: "0.3 ETH",
      status: "in-progress" as const,
    },
  ]);

  if (!isConnected) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome to WriteXchange</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your wallet to start posting jobs or submitting proposals
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Available Jobs</h2>
          <Button size="lg">Post a Job</Button>
        </div>
        <div className="grid gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onSubmitProposal={() => console.log('Submit proposal for job:', job.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
