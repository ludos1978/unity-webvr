using UnityEngine;
using System.Collections;
using System.Runtime.InteropServices;

public class WebVRCamera : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void FinishLoading();

    Quaternion q;

    bool active = false;
    private Vector3 rotation;

    public void TiltW(float w)
    {
        q.w = w;
    }

    public void TiltX(float x)
    {
        q.x = x;
    }

    public void TiltY(float y)
    {
        q.y = y;
    }

    public void TiltZ(float z)
    {
        q.z = z;
    }

    public void Begin()
    {
        active = true;
    }

    void Start()
    {
        FinishLoading();
    }

    void Update()
    {
        if (active == true)
        {
            Camera.main.transform.rotation = q;
        }
    }
}