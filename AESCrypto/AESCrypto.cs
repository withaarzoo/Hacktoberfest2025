using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

class AESCrypto
{
    public static void Main()
    {
        Console.Write("Enter text to encrypt: ");
        string text = Console.ReadLine();
        string key = "A1B2C3D4E5F6G7H8";

        string encrypted = Encrypt(text, key);
        Console.WriteLine($"Encrypted: {encrypted}");
        Console.WriteLine($"Decrypted: {Decrypt(encrypted, key)}");
    }

    public static string Encrypt(string text, string key)
    {
        using Aes aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(key);
        aes.IV = new byte[16];
        ICryptoTransform encryptor = aes.CreateEncryptor();
        byte[] bytes = Encoding.UTF8.GetBytes(text);
        byte[] encrypted = encryptor.TransformFinalBlock(bytes, 0, bytes.Length);
        return Convert.ToBase64String(encrypted);
    }

    public static string Decrypt(string cipherText, string key)
    {
        using Aes aes = Aes.Create();
        aes.Key = Encoding.UTF8.GetBytes(key);
        aes.IV = new byte[16];
        ICryptoTransform decryptor = aes.CreateDecryptor();
        byte[] bytes = Convert.FromBase64String(cipherText);
        byte[] decrypted = decryptor.TransformFinalBlock(bytes, 0, bytes.Length);
        return Encoding.UTF8.GetString(decrypted);
    }
}
