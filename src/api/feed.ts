// src/api/feed.ts

import type {
    FeedPage,
    CurrentSha,
    TagsIndex,
    CollectionsIndex,
} from "../types/Feed";

// GitHub Pages / Vite dev 모두에서 공통으로 사용할 데이터 베이스 경로
const DATA_BASE = "/data";

/**
 * 공통 JSON fetch 헬퍼
 */
async function fetchJson<T>(path: string): Promise<T> {
    const res = await fetch(path, {
        // 피드/메타는 자주 바뀔 수 있으니, 개발 중에는 캐시 끔
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText} (${path})`);
    }

    return (await res.json()) as T;
}

/**
 * /data/current.json 에서 최신 sha 가져오기
 */
export async function fetchCurrentSha(): Promise<CurrentSha> {
    const url = `${DATA_BASE}/current.json`;
    return await fetchJson<CurrentSha>(url);
}

/**
 * 특정 sha 기준, 페이지 번호에 해당하는 feed JSON 가져오기
 * ex) /data/feed/page-1@<sha>.json
 */
export async function fetchFeedPage(
    sha: string,
    page: number
): Promise<FeedPage> {
    const url = `${DATA_BASE}/feed/page-${page}@${sha}.json`;
    return await fetchJson<FeedPage>(url);
}

/**
 * 특정 sha 기준, 태그 인덱스 가져오기
 * ex) /data/tags@<sha>.json
 */
export async function fetchTagsIndex(sha: string): Promise<TagsIndex> {
    const url = `${DATA_BASE}/tags@${sha}.json`;
    return await fetchJson<TagsIndex>(url);
}

/**
 * 특정 sha 기준, 컬렉션 인덱스 가져오기
 * ex) /data/collections@<sha>.json
 */
export async function fetchCollectionsIndex(
    sha: string
): Promise<CollectionsIndex> {
    const url = `${DATA_BASE}/collections@${sha}.json`;
    return await fetchJson<CollectionsIndex>(url);
}

/**
 * 가장 기본적인 "초기 페이지 로딩" 헬퍼:
 * - current.json에서 최신 sha 가져오고
 * - 1페이지 피드를 함께 가져온다
 */
export async function loadInitialFeed(page: number = 1): Promise<{
    current: CurrentSha;
    page: FeedPage;
}> {
    const current = await fetchCurrentSha();
    const pageData = await fetchFeedPage(current.sha, page);
    return { current, page: pageData };
}
