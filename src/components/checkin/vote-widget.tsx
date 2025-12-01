'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, ThumbsUp, Loader2 } from 'lucide-react';
import { submitVote } from '@/app/checkin/actions';

export function VoteWidget({ visitorId }: { visitorId: string }) {
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (teamName: string) => {
    setIsVoting(true);
    // Panggil Server Action simulasi
    await submitVote(visitorId, teamName);
    setHasVoted(true);
    setIsVoting(false);
  };

  if (hasVoted) {
    return (
      <div className="bg-primary/10 p-6 rounded-xl text-center mt-6 border border-primary/20 animate-in fade-in zoom-in">
        <ThumbsUp className="w-10 h-10 text-primary mx-auto mb-2" />
        <p className="text-primary font-bold text-lg">Terima kasih atas dukunganmu!</p>
        <p className="text-sm text-muted-foreground">Vote Anda telah tercatat di sistem kami.</p>
      </div>
    );
  }

  return (
    <Card className="mt-8 border-2 border-dashed border-secondary bg-secondary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-headline flex items-center justify-center gap-2 text-foreground">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Dukung Tim Jagoanmu!
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {/* Tombol Vote Tim A */}
        <Button 
          onClick={() => handleVote("Tim Elang")} 
          disabled={isVoting}
          variant="outline" 
          className="h-auto py-4 flex flex-col gap-1 hover:border-primary hover:bg-primary/5 transition-all"
        >
          {isVoting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
            <>
              <span className="font-bold text-base">Tim Elang</span>
              <span className="text-xs text-muted-foreground font-normal">Ganda Putra</span>
            </>
          )}
        </Button>

        {/* Tombol Vote Tim B */}
        <Button 
          onClick={() => handleVote("Tim Rajawali")} 
          disabled={isVoting}
          variant="outline" 
          className="h-auto py-4 flex flex-col gap-1 hover:border-primary hover:bg-primary/5 transition-all"
        >
          {isVoting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
            <>
              <span className="font-bold text-base">Tim Rajawali</span>
              <span className="text-xs text-muted-foreground font-normal">Ganda Putra</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
