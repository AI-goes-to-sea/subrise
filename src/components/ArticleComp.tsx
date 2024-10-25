
import React from "react";
import { ArticleItems } from "../constants";
import ArticleContext from "./ArticleContext";

export default function ArticleComp({article}: {
  article: ArticleItems
}) {
  return (
      <ArticleContext meta={{
        title: article?.title??'',
        description: article?.description??'',
        tag: article?.tags??''
      }} content={article?.content??''} />
  )
}