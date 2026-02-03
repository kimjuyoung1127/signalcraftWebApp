/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_TITLE: string;
    // 프로젝트에 필요한 다른 환경 변수들을 여기에 추가하세요
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
