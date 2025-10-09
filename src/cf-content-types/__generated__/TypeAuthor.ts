import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAuthorFields {
    name?: EntryFieldTypes.Symbol;
    avatar?: EntryFieldTypes.AssetLink;
    blurb?: EntryFieldTypes.RichText;
}

export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
export type TypeAuthor<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;

export function isTypeAuthor<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAuthor<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'author'
}
