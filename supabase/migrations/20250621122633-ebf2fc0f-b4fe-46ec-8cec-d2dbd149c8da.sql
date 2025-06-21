
-- Fix function search_path security issues
-- Update log_activity function to have immutable search_path
CREATE OR REPLACE FUNCTION public.log_activity(_action text, _resource_type text, _resource_id text, _status text, _details jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.activity_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    status,
    details
  ) VALUES (
    auth.uid(),
    _action,
    _resource_type,
    _resource_id,
    _status,
    _details
  );
END;
$function$;

-- Update update_updated_at_column function to have immutable search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;
