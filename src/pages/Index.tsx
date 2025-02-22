
import { Layout } from "@/components/Layout";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { useAccount, useSendTransaction } from 'wagmi';
import { useState } from "react";
import { toast } from "sonner";
import { parseEther } from 'viem';

const Index = () => {
  const { isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [jobs] = useState([
    {
      id: 1,
      title: "Technical Blog Post about Web3",
      description: "Looking for an experienced writer to create a comprehensive blog post about Web3 technology and its implications for the future of the internet.",
      budget: "0.1 ETH",
      status: "open" as const,
      address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" // Example address (Vitalik's address)
    },
    {
      id: 2,
      title: "White Paper for DeFi Protocol",
      description: "Need a professional writer to create a detailed white paper for our new DeFi protocol. Must have experience in cryptocurrency and financial writing.",
      budget: "0.3 ETH",
      status: "in-progress" as const,
      address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045" // Example address (Vitalik's address)
    },
  ]);

  const handleSubmitProposal = async (jobId: number) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    try {
      const ethAmount = job.budget.replace(" ETH", "");
      
      toast.success("Please confirm the transaction in your wallet");
      
      // Send the transaction and get the hash
      const hash = await sendTransactionAsync({
        to: job.address as `0x${string}`,
        value: parseEther(ethAmount),
      });

      if (hash) {
        toast.success("Transaction submitted!");
      }
    } catch (error: any) {
      console.error('Transaction error:', error);
      toast.error(error?.message || "Transaction failed. Please try again.");
    }
  };

  const handlePostJob = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to post a job");
      return;
    }
    console.log('Post new job');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to WriteXchange</h1>
          <p className="text-xl text-muted-foreground mb-8">
            {!isConnected 
              ? "Connect your wallet to start posting jobs or submitting proposals"
              : "Browse available jobs or post your own"}
          </p>
        </div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Available Jobs</h2>
          <Button size="lg" onClick={handlePostJob}>Post a Job</Button>
        </div>
        <div className="grid gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onSubmitProposal={job.status === 'open' ? 
                (isConnected ? () => handleSubmitProposal(job.id) : undefined) 
                : undefined}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
