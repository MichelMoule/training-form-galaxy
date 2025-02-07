
import { TrainingProgram } from '@/lib/types';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface CommentSectionProps {
  program: TrainingProgram;
  handleChange: (field: keyof TrainingProgram, value: any) => void;
}

const CommentSection = ({ program, handleChange }: CommentSectionProps) => {
  return (
    <Card className="p-4 bg-gray-50">
      <h3 className="font-medium text-lg mb-4">Commentaires additionnels</h3>
      <div className="space-y-2">
        <Label htmlFor="comment">Commentaire (envoyé uniquement par email)</Label>
        <Textarea
          id="comment"
          value={program.comment || ''}
          onChange={(e) => handleChange('comment', e.target.value)}
          placeholder="Ajoutez vos commentaires ici..."
          className="min-h-[100px]"
        />
      </div>
    </Card>
  );
};

export default CommentSection;
