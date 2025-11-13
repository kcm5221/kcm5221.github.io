// src/types/feed.ts

// 글 하나(피드 아이템)의 구조
export interface FeedItem {
    id: string;
    title: string;
    created: string;      // ISO 문자열 (정렬 기준)
    updated: string;      // ISO 문자열
    date: string;         // created와 동일하게 사용
    tags: string[];
    collection: string | null;
    cover: string | null; // 나중에 썸네일/이미지 URL 들어갈 자리 (없으면 null)
    summary: string;
    slug: string;         // URL 등에 쓰일 짧은 이름
    path: string;         // 원본 markdown 경로 (ex: posts/2025/11/hello.md)
    hidden: boolean;
    draft: boolean;
}

// 한 페이지 분량의 피드 JSON 구조
export interface FeedPage {
    page: number;
    pageSize: number;
    total: number;
    sha: string;
    items: FeedItem[];
}

// /data/current.json 구조
export interface CurrentSha {
    sha: string;
    generatedAt: string;
}

// /data/tags@sha.json 구조
export interface TagsIndex {
    sha: string;
    tags: Record<string, string[]>; // tag -> [postId, ...]
}

// /data/collections@sha.json 구조
export interface CollectionsIndex {
    sha: string;
    collections: Record<string, string[]>; // collection -> [postId, ...]
}
