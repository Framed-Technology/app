"use client";

import React from "react";
import { useSession } from "next-auth/react";

const Details = () => {
  const { data: session } = useSession(); // this should read from the db, not the sesssion.
  // TODO: render data into form that can be submitted to update database.
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default Details;
