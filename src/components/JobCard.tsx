
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  description: string;
  budget: string;
  status: 'open' | 'in-progress' | 'completed';
  onSubmitProposal?: () => void;
}

export const JobCard = ({ title, description, budget, status, onSubmitProposal }: JobCardProps) => {
  return (
    <Card className="p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <Badge 
            variant={status === 'open' ? 'default' : status === 'in-progress' ? 'secondary' : 'outline'}
            className="mb-2"
          >
            {status}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Budget</div>
          <div className="font-semibold">{budget}</div>
        </div>
      </div>
      <p className="text-muted-foreground mb-4">
        {description}
      </p>
      {status === 'open' && (
        <Button 
          onClick={onSubmitProposal} 
          className="w-full"
          disabled={!onSubmitProposal}
        >
          {onSubmitProposal ? 'Submit Proposal' : 'Connect Wallet to Submit'}
        </Button>
      )}
    </Card>
  );
};
