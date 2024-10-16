//Info dentro del body:
export type FAQBodyChildType = {
    type: string;
    text: string;
}

export type FAQBodyType = {
    type: string;
    children: FAQBodyChildType[]
}

//Info final del obj entero
export type FAQPageType = {
    id: number;
    documentId: string;
    title: string;
    body: FAQBodyType[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    slug: string;
}