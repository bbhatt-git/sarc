'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useUser } from '@/firebase';
import { updateProfile, updatePassword } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, User as UserIcon, KeyRound } from 'lucide-react';

export default function ProfileView() {
  const { user } = useUser();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordSaving, setIsPasswordSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [user]);

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to update your profile.',
      });
      return;
    }

    setIsSaving(true);
    try {
      await updateProfile(user, { displayName });
      toast({
        title: 'Success!',
        description: 'Your profile has been updated.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error updating profile',
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must be logged in to change your password.',
      });
      return;
    }
    
    if (newPassword.length < 6) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Password must be at least 6 characters long.',
        });
        return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Passwords do not match.',
      });
      return;
    }

    setIsPasswordSaving(true);
    try {
      await updatePassword(user, newPassword);
      toast({
        title: 'Success!',
        description: 'Your password has been changed successfully.',
      });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error changing password',
        description: 'This is a sensitive operation. Please log in again before retrying.',
      });
    } finally {
      setIsPasswordSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 space-y-8">
       <Card className="testimonial-card max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-primary/50">
              {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || ''} />}
              <AvatarFallback className="text-3xl">
                {user.email ? user.email.charAt(0).toUpperCase() : <UserIcon />}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl">{user.displayName || 'Administrator'}</CardTitle>
              <CardDescription className="text-base">{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="testimonial-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Enter a new password for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isPasswordSaving}>
                {isPasswordSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
                Change Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}