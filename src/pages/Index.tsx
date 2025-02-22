
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
      title: "Professional Website Content Writing",
      description: "Need professional content writing services for a 5-page business website. Topics include Home, About Us, Services, Portfolio, and Contact pages. Expert writer with B2B experience required.",
      budget: "0.15 ETH",
      status: "open" as const,
      address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
    },
    {
      id: 2,
      title: "SEO Blog Posts Package - 10 Articles",
      description: "Looking for an experienced SEO content writer to create 10 blog posts (2000 words each) about digital marketing topics. Must have knowledge of SEO best practices and keyword optimization.",
      budget: "0.25 ETH",
      status: "open" as const,
      address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
    },
    {
      id: 3,
      title: "Product Description Writing",
      description: "Need engaging product descriptions for an e-commerce store with 50 products in the fashion category. Each description should be 150-200 words with compelling sales copy.",
      budget: "0.2 ETH",
      status: "open" as const,
      address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
    }
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
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12 bg-gradient-to-b from-primary/10 to-background rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Welcome to WriteXchange</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            The decentralized marketplace for professional content writing services. 
            Connect your wallet to start buying or selling content writing services.
          </p>
          
          {/* How it Works Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
            <div className="flex flex-col items-center p-4">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Browse Jobs</h3>
              <p className="text-sm text-muted-foreground text-center">
                Explore available writing opportunities posted by clients
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Connect Wallet</h3>
              <p className="text-sm text-muted-foreground text-center">
                Link your crypto wallet to access the marketplace
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Submit Payment</h3>
              <p className="text-sm text-muted-foreground text-center">
                Pay securely with ETH to get your content delivered
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Available Writing Jobs</h2>
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
