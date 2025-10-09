import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMetadatatestFields {
    title?: EntryFieldTypes.Symbol;
}

export type TypeMetadatatestSkeleton = EntrySkeletonType<TypeMetadatatestFields, "metadatatest">;
export type TypeMetadatatest<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMetadatatestSkeleton, Modifiers, Locales>;

export function isTypeMetadatatest<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeMetadatatest<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'metadatatest'
}
