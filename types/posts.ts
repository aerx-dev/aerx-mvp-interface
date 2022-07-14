export type PostDraft = {
    title: string;
    description: string;
    media: string;
    media_hash: string;
    issued_at: string;
    extra: string;
};

export type PostArgs = {
    user_id: string;
    token_metadata: PostDraft;
};
