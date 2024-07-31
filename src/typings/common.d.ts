declare type SSLOPTIONTYPE = {
  require: boolean;
  rejectUnauthorized: boolean;
};

// format for errors response [{field: message}, ...]
declare type ERRORS_RESPONSE = Record<string, string>[];
