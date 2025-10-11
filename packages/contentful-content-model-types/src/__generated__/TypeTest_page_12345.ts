import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTest_page_12345Fields {
    title?: EntryFieldTypes.Symbol;
}

export type TypeTest_page_12345Skeleton = EntrySkeletonType<TypeTest_page_12345Fields, "test_page_12345">;
export type TypeTest_page_12345<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTest_page_12345Skeleton, Modifiers, Locales>;

export function isTypeTest_page_12345<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeTest_page_12345<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'test_page_12345'
}
