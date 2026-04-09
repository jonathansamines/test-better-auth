"use client";

import { ChevronDown, Copy, Loader2, MailPlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient, organization, useActiveOrganization, useListOrganizations } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FullOrg = NonNullable<ReturnType<typeof useActiveOrganization>["data"]>;

export function DashboardOrganizationCard() {
  const { data: session } = authClient.useSession();
  const { data: orgList, refetch: refetchOrgList } = useListOrganizations();
  const { data: activeOrg, refetch: refetchActive } = useActiveOrganization();

  const [optimisticOrg, setOptimisticOrg] = useState<FullOrg | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createSlug, setCreateSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [creating, setCreating] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"member" | "admin">("member");
  const [inviting, setInviting] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  useEffect(() => {
    setOptimisticOrg(activeOrg ?? null);
  }, [activeOrg]);

  useEffect(() => {
    if (!slugTouched && createName) {
      setCreateSlug(createName.trim().toLowerCase().replace(/\s+/g, "-"));
    }
  }, [createName, slugTouched]);

  async function onOrgSelect(organizationId: string) {
    if (organizationId === "") {
      await organization.setActive({ organizationId: null });
      setOptimisticOrg(null);
      await refetchActive();
      return;
    }
    const res = await organization.setActive({ organizationId });
    if (res.error) {
      window.alert(res.error.message ?? "Could not switch organization");
      return;
    }
    if (res.data) setOptimisticOrg(res.data as FullOrg);
    await refetchActive();
  }

  async function onCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    if (!createName.trim()) return;
    setCreating(true);
    const slug = createSlug.trim() || createName.trim().toLowerCase().replace(/\s+/g, "-");
    const res = await organization.create({
      name: createName.trim(),
      slug,
    });
    setCreating(false);
    if (res.error) {
      window.alert(res.error.message ?? "Could not create organization");
      return;
    }
    setCreateName("");
    setCreateSlug("");
    setSlugTouched(false);
    setCreateOpen(false);
    await refetchOrgList();
    await refetchActive();
  }

  async function onInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!optimisticOrg?.id || !inviteEmail.trim()) return;
    setInviting(true);
    const res = await organization.inviteMember({
      email: inviteEmail.trim(),
      role: inviteRole,
    });
    setInviting(false);
    if (res.error) {
      window.alert(res.error.message ?? "Invite failed");
      return;
    }
    setInviteEmail("");
    if (res.data && optimisticOrg) {
      setOptimisticOrg({
        ...optimisticOrg,
        invitations: [...(optimisticOrg.invitations ?? []), res.data],
      });
    }
    await refetchActive();
  }

  async function onRevokeInvitation(invitationId: string) {
    setRevokingId(invitationId);
    const res = await organization.cancelInvitation({ invitationId });
    setRevokingId(null);
    if (res.error) {
      window.alert(res.error.message ?? "Could not revoke invitation");
      return;
    }
    if (optimisticOrg?.invitations) {
      setOptimisticOrg({
        ...optimisticOrg,
        invitations: optimisticOrg.invitations.filter((i) => i.id !== invitationId),
      });
    }
    await refetchActive();
  }

  async function onRemoveMember(memberId: string) {
    const res = await organization.removeMember({ memberIdOrEmail: memberId });
    if (res.error) {
      window.alert(res.error.message ?? "Could not remove member");
      return;
    }
    if (optimisticOrg?.members) {
      setOptimisticOrg({
        ...optimisticOrg,
        members: optimisticOrg.members.filter((m) => m.id !== memberId),
      });
    }
    await refetchActive();
  }

  const currentMember = optimisticOrg?.members?.find((m) => m.userId === session?.user.id);
  const pendingInvites =
    optimisticOrg?.invitations?.filter((i) => (i as { status?: string }).status === "pending") ?? [];

  return (
    <Card className="border-border shadow-sm ring-0">
      <CardHeader className="gap-3">
        <CardTitle>Organization</CardTitle>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="relative flex items-center gap-1">
            <select
              className="cursor-pointer appearance-none bg-transparent py-1 pr-7 text-sm outline-none"
              value={optimisticOrg?.id ?? ""}
              aria-label="Active organization"
              onChange={(e) => void onOrgSelect(e.target.value)}
            >
              <option value="">Personal</option>
              {(orgList ?? []).map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 opacity-70" />
          </div>
          <Button type="button" size="sm" className="gap-2" variant="default" onClick={() => setCreateOpen((o) => !o)}>
            <Plus className="size-4" />
            New Organization
          </Button>
        </div>

        {createOpen ? (
          <form onSubmit={onCreateOrg} className="flex flex-col gap-3 rounded-md border border-border p-3">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Organization name</Label>
              <Input
                id="org-name"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="Acme Inc"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-slug">Slug</Label>
              <Input
                id="org-slug"
                value={createSlug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setCreateSlug(e.target.value);
                }}
                placeholder="acme-inc"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={creating}>
                {creating ? <Loader2 className="size-4 animate-spin" /> : "Create"}
              </Button>
            </div>
          </form>
        ) : null}

        <div className="flex items-center gap-2">
          <Avatar className="rounded-none">
            <AvatarImage src={optimisticOrg?.logo ?? undefined} className="size-full rounded-none object-cover" alt="" />
            <AvatarFallback className="rounded-none">{optimisticOrg?.name?.charAt(0) ?? "P"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{optimisticOrg?.name ?? "Personal"}</p>
            <p className="text-xs text-muted-foreground">
              {optimisticOrg?.members?.length ?? 1} members
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex min-w-0 flex-grow flex-col gap-2">
            <p className="border-b-2 border-b-foreground/10 font-medium">Members</p>
            <div className="flex flex-col gap-2">
              {optimisticOrg?.id
                ? optimisticOrg.members?.map((member) => (
                    <div key={member.id} className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <Avatar className="h-9 w-9 sm:flex">
                          <AvatarImage
                            src={member.user.image ?? undefined}
                            className="object-cover"
                            alt=""
                          />
                          <AvatarFallback>{member.user.name?.charAt(0) ?? "?"}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm">{member.user.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      {member.role !== "owner" &&
                        (currentMember?.role === "owner" || currentMember?.role === "admin") && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => void onRemoveMember(member.id)}
                          >
                            {currentMember?.id === member.id ? "Leave" : "Remove"}
                          </Button>
                        )}
                    </div>
                  ))
                : null}
              {!optimisticOrg?.id && session?.user ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session.user.image ?? undefined} alt="" />
                    <AvatarFallback>{session.user.name?.charAt(0) ?? "?"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground">Owner</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex min-w-0 flex-grow flex-col gap-2">
            <p className="border-b-2 border-b-foreground/10 font-medium">Invites</p>
            <div className="flex flex-col gap-2">
              {pendingInvites.map((invitation) => (
                <div key={invitation.id} className="flex flex-wrap items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm">{(invitation as { email?: string }).email}</p>
                    <p className="text-xs text-muted-foreground">{(invitation as { role?: string }).role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={revokingId === invitation.id}
                      onClick={() => void onRevokeInvitation(invitation.id)}
                    >
                      {revokingId === invitation.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        "Revoke"
                      )}
                    </Button>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      className="size-8"
                      title="Copy invite link"
                      onClick={() => {
                        const origin = typeof window !== "undefined" ? window.location.origin : "";
                        void navigator.clipboard.writeText(`${origin}/accept-invitation/${invitation.id}`);
                      }}
                    >
                      <Copy className="size-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              {optimisticOrg?.id && pendingInvites.length === 0 ? (
                <p className="text-sm text-muted-foreground">No active invitations</p>
              ) : null}
              {!optimisticOrg?.id ? (
                <p className="text-xs text-muted-foreground">
                  You can&apos;t invite members to your personal workspace.
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {optimisticOrg?.id ? (
          <form onSubmit={onInvite} className="mt-4 flex w-full flex-col gap-3 border-t border-border pt-4 md:ml-auto md:max-w-sm">
            <p className="text-sm font-medium">Invite member</p>
            <div className="grid gap-2">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invite-role">Role</Label>
              <select
                id="invite-role"
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as "member" | "admin")}
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <Button type="submit" size="sm" className="gap-2 self-end" variant="secondary" disabled={inviting}>
              {inviting ? <Loader2 className="size-4 animate-spin" /> : <MailPlus className="size-4" />}
              Invite
            </Button>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}
